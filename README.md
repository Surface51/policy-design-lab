# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Notes
* If this has to be kept completely static, we should probably use IndexDB to help with CSV pagination, as I don't think that this will work if we continue using RAM only.
* Fast API (python) is what the policy design website currently uses, so that is what we should use if we need to create some server logic. 
* If we're free to do whatever, I think that we should use Cloudflare's Pages/Workers, as its completely free and would make things significantly easier.