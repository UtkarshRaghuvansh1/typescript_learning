# Typescript

## Notes -:

- TS provide a type safety
- TS is a superset of JS
- TS need a compiler to run on browser to compile its code into JS
- Type safety exists only at compile time
- At runtime, it's just JavaScript

## Configure Typescript

1. Installation

```shell
npm install -g typescript
```

2. Create Config

```sh
tsc --init
```

- A tsconfig.json file will be created

3. Enable strict mode in tsconfig.json:

```json
"strict": true
```

4. Run the code

```bash
tsc filename.ts
```
