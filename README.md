This is a [Electronjs](https://www.electronjs.org/) + [React](https://react.dev/) + [Next.js](https://nextjs.org) boilerplate template

## Getting Started
First, run:

`npm install`

The project depends on `Concurrently` and `wait-on`
install them as global dependencies

`npm install -g concurrently`

and 

`npm install -g wait-on`

Development server:

```bash
# Development mode 

npm run electron:dev

# Do not use AppRoutes, they won't work correctly
```


Build project:

```bash
# Build

npm run electron:build

# Do not use AppRoutes, they won't work correctly
```
