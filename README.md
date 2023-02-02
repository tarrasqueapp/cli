<div align="center">
  <a href="https://tarrasque.app" target="_blank"><img src="https://tarrasque.app/images/logo.svg" width="150" /></a>
  <h1>@tarrasque/cli</h1>
</div>

Tarrasque CLI is the official command-line interface for [Tarrasque App](https://tarrasque.app) and can be used to run Tarrasque App locally.

## Requirements

- [Node.js](https://nodejs.org/en/) (v18.12.1 or higher)

## Installation

You can install the CLI globally using npm:

```bash
npm install -g @tarrasque/cli
```

This will install the `tarrasque` command globally so that it may be run from the command line.

If you wish, you can also create an alias for the `tarrasque` command in your shell's configuration file (e.g. `~/.bashrc` or `~/.zshrc`):

```bash
alias t=tarrasque
```

## Usage

To view the list of available commands, run:

```bash
tarrasque --help
```

### Running Tarrasque App locally

To run Tarrasque App locally, first navigate to the directory where your Tarrasque App copy is located and run:

```bash
tarrasque app dev
```

### Self-Update

To update the CLI to the latest version, run:

```bash
tarrasque self-update
```
