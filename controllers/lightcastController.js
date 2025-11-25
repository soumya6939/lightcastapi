const axios = require('axios');

// Store access token globally
let accessToken = null;
let tokenExpiry = null;

/**
 * Connect to LightCast API and obtain access token
 * @returns {Promise<Object>} Token response data
 */
const connectToLightcast = async () => {
    const connectUrl = process.env.LIGHTCAST_CONNECT_URL;
    const clientId = process.env.LIGHTCAST_CLIENT_ID;
    const clientSecret = process.env.LIGHTCAST_CLIENT_SECRET;
    const grantType = process.env.LIGHTCAST_GRANT_TYPE || 'client_credentials';
    const scope = process.env.LIGHTCAST_SCOPE;

    // Validate required environment variables
    if (!connectUrl || !clientId || !clientSecret) {
        const missing = [];
        if (!connectUrl) missing.push('LIGHTCAST_CONNECT_URL');
        if (!clientId) missing.push('LIGHTCAST_CLIENT_ID');
        if (!clientSecret) missing.push('LIGHTCAST_CLIENT_SECRET');
        
        const error = new Error(`Missing required environment variables: ${missing.join(', ')}`);
        console.error('LightCast connection error:', error.message);
        throw error;
    }

    try {
        // OAuth2 token request typically uses form-urlencoded format
        const params = new URLSearchParams();
        params.append('grant_type', grantType);
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        if (scope) {
            params.append('scope', scope);
        }

        const response = await axios.post(connectUrl, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Store access token and expiry
        if (response.data && response.data.access_token) {
            accessToken = response.data.access_token;
            // Calculate expiry time (default to 1 hour if expires_in not provided)
            const expiresIn = response.data.expires_in || 3600;
            tokenExpiry = new Date(Date.now() + expiresIn * 1000);
            console.log('LightCast connected successfully. Token expires at:', tokenExpiry.toISOString());
        } else {
            console.warn('LightCast connection response missing access_token');
        }

        return response.data;
    } catch (error) {
        const errorMessage = error.response 
            ? `Status: ${error.response.status}, Message: ${error.response.data?.error_description || error.response.data?.error || error.message}`
            : error.message;
        
        console.error('Error connecting to LightCast:', errorMessage);
        
        // Reset token on error
        accessToken = null;
        tokenExpiry = null;
        
        throw new Error(`LightCast connection failed: ${errorMessage}`);
    }
};

/**
 * Get the current access token, refreshing if needed
 * @returns {Promise<string>} Access token
 */
const getAccessToken = async () => {
    // Check if token exists and is not expired
    if (accessToken && tokenExpiry && new Date() < tokenExpiry) {
        return accessToken;
    }

    // Token expired or doesn't exist, get a new one
    await connectToLightcast();
    return accessToken;
};

/**
 * Make an authenticated request to LightCast API
 * @param {string} method - HTTP method
 * @param {string} url - API endpoint URL
 * @param {Object} data - Request body data (optional)
 * @param {Object} params - Query parameters (optional)
 * @returns {Promise<Object>} API response data
 */
const makeLightcastRequest = async (method, url, data = null, params = null) => {
    try {
        const token = await getAccessToken();
        
        const config = {
            method,
            url,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        if (data) {
            config.data = data;
        }

        if (params) {
            config.params = params;
        }

        const response = await axios(config);
        return response.data;
    } catch (error) {
        const errorMessage = error.response
            ? `Status: ${error.response.status}, Message: ${JSON.stringify(error.response.data)}`
            : error.message;
        
        console.error('LightCast API request error:', errorMessage);
        throw new Error(`LightCast API request failed: ${errorMessage}`);
    }
};

/**
 * Get all skills from LightCast API
 * @param {Object} queryParams - Query parameters (typeIds, fields, limit, etc.)
 * @returns {Promise<Object>} Skills data
 */
const getAllSkills = async (queryParams = {}) => {
    const baseUrl = 'https://emsiservices.com/skills/versions/latest/skills';
    return await makeLightcastRequest('GET', baseUrl, null, queryParams);
};

/**
 * Extract skills from text/document
 * @param {string} text - Text to extract skills from
 * @param {number} confidenceThreshold - Minimum confidence threshold (0-1)
 * @param {string} language - Language code (default: 'en')
 * @returns {Promise<Object>} Extracted skills data
 */
const extractSkills = async (text, confidenceThreshold = 0.9, language = 'en') => {
    const baseUrl = 'https://emsiservices.com/skills/versions/latest/extract';
    const params = { language };
    const data = {
        text,
        confidenceThreshold,
    };
    return await makeLightcastRequest('POST', baseUrl, data, params);
};

/**
 * Get related skills
 * @param {Array<string>} ids - Array of skill IDs
 * @returns {Promise<Object>} Related skills data
 */
const getRelatedSkills = async (ids) => {
    const baseUrl = 'https://emsiservices.com/skills/versions/latest/related';
    
    const data = {
        ids: Array.isArray(ids) ? ids : [ids],
    };
    return await makeLightcastRequest('POST', baseUrl, data, null);
};

module.exports = {
    connectToLightcast,
    getAccessToken,
    makeLightcastRequest,
    getAllSkills,
    extractSkills,
    getRelatedSkills,
};
