# reference-data-text

Displays the description or long value given a code from reference data.

For example `au` will be displayed as `Australia`


```
<ReferenceDataText type="countries" value="au"/>
```  

> Note this only works if it deployed under the same domain as the reference data service.

> Or use a proxy.

## Usage

### Install
```
npm i @react-ag-components/reference-data-text --save
```
### Use in your project
```
import ReferenceDataText from '@react-ag-components/reference-data-text'
```

```
<ReferenceDataText type="countries" value="au"/>
```

### Properties


## Contributing

Get the repository
```
git clone https://github.com/alphillips/reference-data-text.git
```

Update dependencies
```
npm install
```

Run the project
```
npm start
```

### Deploy to npm
#### Build
`npm run build -- --copy-files`

#### Publish
`npm publish --access public`
