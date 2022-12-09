const asset = (pathOrName = '') => `${process.env.NODE_ENV == 'development' ? process.env.REACT_APP_ASSET_URL : process.env.REACT_APP_PRODUCTION_ASSET_URL}/${pathOrName}`;
export default asset;
