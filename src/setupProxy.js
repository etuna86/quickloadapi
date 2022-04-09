const { createProxyMiddleware } = require('http-proxy-middleware');

const baseURL = "https://teknasyon.myshopify.com";

module.exports= app=>{
    app.use(
        createProxyMiddleware('/admin/api/2022-01/products.json',{
            target:'https://teknasyon.myshopify.com',
            changeOrigin:true,
        })
    )
}