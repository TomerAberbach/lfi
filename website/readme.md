# Website

This website is built using [Docusaurus](https://docusaurus.io).

### Installation

```sh
$ pnpm install
```

### Local Development

```sh
$ pnpm start
```

This command starts a local development server and opens up a browser window.
Most changes are reflected live without having to restart the server.

### Build

```sh
$ pnpm build
```

This command generates static content into the `build` directory and can be
served using any static contents hosting service.

### Deployment

Using SSH:

```sh
$ USE_SSH=true pnpm deploy
```

This command is a convenient way to build the website and push to the `gh-pages`
branch.
