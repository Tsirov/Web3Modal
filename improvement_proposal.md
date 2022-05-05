# Improvement Proposal

## Code Styling

Remove unused imports and variables.

Remove commented code.

Define

## Logic

Provider state must be placed on one place only.

## Good practises

Address also can be set on one place.

Extract logic which is used multiple times in on place (service).

Put state which is used from multiple childs on higher level.

### Inconsistent function naming

App.js -> getProvider => setProvider is better because this function set the provider than getting it.
