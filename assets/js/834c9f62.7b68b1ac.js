(window.webpackJsonp=window.webpackJsonp||[]).push([[121],{226:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return p}));var a=n(3),r=n(8),o=(n(0),n(343)),i={id:"multiple-apis",title:"Extending Schema with Multiple APIs",sidebar_label:"5. Extending Schema with Multiple APIs"},s={unversionedId:"getting-started/multiple-apis",id:"getting-started/multiple-apis",isDocsHomePage:!1,title:"Extending Schema with Multiple APIs",description:"Extending Schema with JavaScript Code File",source:"@site/docs/getting-started/multiple-apis.md",slug:"/getting-started/multiple-apis",permalink:"/docs/getting-started/multiple-apis",editUrl:"https://github.com/urigo/graphql-mesh/edit/master/website/docs/getting-started/multiple-apis.md",version:"current",sidebar_label:"5. Extending Schema with Multiple APIs",sidebar:"sidebar",previous:{title:"Mesh Transforms",permalink:"/docs/getting-started/mesh-transforms"},next:{title:"Available Handlers",permalink:"/docs/handlers/available-handlers"}},l=[{value:"Extending Schema with JavaScript Code File",id:"extending-schema-with-javascript-code-file",children:[]},{value:"Stitching Schemas using declarative API without JavaScript Code File",id:"stitching-schemas-using-declarative-api-without-javascript-code-file",children:[]}],c={toc:l};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"extending-schema-with-javascript-code-file"},"Extending Schema with JavaScript Code File"),Object(o.b)("p",null,"You can add custom resolvers and custom GraphQL schema SDL, and use the API SDK to fetch the data and manipulate it. So the query above could be simplified with custom logic."),Object(o.b)("p",null,"This is possible because GraphQL Mesh will make sure to expose all available services in each API in your ",Object(o.b)("inlineCode",{parentName:"p"},"context")," object."),Object(o.b)("p",null,"It's named the same as the API name, so to access the API of ",Object(o.b)("inlineCode",{parentName:"p"},"Wiki")," source, you can use ",Object(o.b)("inlineCode",{parentName:"p"},"context.Wiki.api")," and use the methods you need. It's useful when you need add custom behaviours, fields and types, and also for linking types between schemas."),Object(o.b)("p",null,"In the following example, we will add take the query we had in the ",Object(o.b)("a",{parentName:"p",href:"/docs/getting-started/basic-example"},"previous example"),", and simplify it by adding a new root operation to ",Object(o.b)("inlineCode",{parentName:"p"},"Query")," type, and automate the variables that it needs, in order to create a simpler version of it for the consumers."),Object(o.b)("p",null,"To add a new simple field, that just returns the amount of views for the past month, you can wrap it as following in your GraphQL config file, and add custom resolvers file using ",Object(o.b)("inlineCode",{parentName:"p"},"additionalResolvers")," field:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yml"},"sources:\n  - name: Wiki\n    handler:\n      openapi:\n        source: https://api.apis.guru/v2/specs/wikimedia.org/1.0.0/swagger.yaml\nadditionalTypeDefs: |\n          extend type Query {\n            viewsInPastMonth(project: String!): Float!\n          }\nadditionalResolvers:\n  - ./src/mesh/additional-resolvers.js\n")),Object(o.b)("p",null,"Now, we need to implement ",Object(o.b)("inlineCode",{parentName:"p"},"src/mesh/additional-resolvers.js")," with code that fetches and manipulate the data:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"const moment = require('moment');\n\nconst resolvers = {\n  Query: {\n    viewsInPastMonth: async (root, args, { Wiki }) => {\n      const {\n        items\n      } = await Wiki.api.getMetricsPageviewsAggregateProjectAccessAgentGranularityStartEnd(\n        {\n          access: 'all-access',\n          agent: 'user',\n          end: moment().format('YYYYMMDD'),\n          start: moment()\n            .startOf('month')\n            .subtract(1, 'month')\n            .format('YYYYMMDD'),\n          project: args.project,\n          granularity: 'monthly'\n        }\n      );\n\n      if (!items || items.length === 0) {\n        return 0;\n      }\n\n      return items[0].views;\n    }\n  }\n};\n\nmodule.exports = { resolvers };\n")),Object(o.b)("p",null,"Now run ",Object(o.b)("inlineCode",{parentName:"p"},"graphql-mesh serve")," and you'll be able to see your new field as part of your GraphQL schema, and you'll be able to query for it."),Object(o.b)("p",null,"And now we run the the following GraphQL query to fetch the simplified data:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-graphql"},'query viewsInPastMonth {\n  viewsInPastMonth(project: "en.wikipedia.org")\n}\n')),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"You can find the complete example ",Object(o.b)("a",{parentName:"p",href:"https://github.com/Urigo/graphql-mesh/tree/master/examples/openapi-javascript-wiki"},"here"))),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"You can use TypeScript to have full type-safety in additional resolvers. See ",Object(o.b)("a",{parentName:"p",href:"/docs/recipes/typescript"},"TypeScript Support")," section to learn more.")),Object(o.b)("h2",{id:"stitching-schemas-using-declarative-api-without-javascript-code-file"},"Stitching Schemas using declarative API without JavaScript Code File"),Object(o.b)("p",null,"You can combine multiple APIs in Mesh using ",Object(o.b)("inlineCode",{parentName:"p"},"additionalTypeDefs")," and ",Object(o.b)("inlineCode",{parentName:"p"},"additionalResolvers"),". "),Object(o.b)("p",null,"The following example has two different OpenAPI sources; we add two new fields to a type of ",Object(o.b)("inlineCode",{parentName:"p"},"Cities"),", and those fields have return types from ",Object(o.b)("inlineCode",{parentName:"p"},"Weather")," API."),Object(o.b)("p",null,"But this time we don't use an extra resolvers file for ",Object(o.b)("inlineCode",{parentName:"p"},"additionalResolvers")," but only the configuration file."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-yaml"},'sources:\n  - name: Cities\n    handler:\n      openapi:\n        source: https://api.apis.guru/v2/specs/mashape.com/geodb/1.0.0/swagger.json\n        operationHeaders:\n          \'X-RapidAPI-Key\': f93d3b393dmsh13fea7cb6981b2ep1dba0ajsn654ffeb48c26\n  - name: Weather\n    handler:\n      openapi:\n        source: https://api.apis.guru/v2/specs/weatherbit.io/2.0.0/swagger.json\nadditionalTypeDefs: |\n      extend type PopulatedPlaceSummary {\n        dailyForecast: [Forecast]\n        todayForecast: Forecast\n      }\nadditionalResolvers:\n  - type: PopulatedPlaceSummary\n    field: dailyForecast\n    requiredSelectionSet: | # latitude and longitude will be request if dailyForecast is requested on PopulatedPlaceSummary level\n      {\n        latitude\n        longitude\n      }\n    targetSource: Weather ## Target Source Name\n    targetMethod: getForecastDailyLatLatLonLon # Target root field of that source\n    returnData: data # Return `data` property of returned data\n    args:\n      lat: "{root.latitude}" # Access required fields and pass those to args of getForecastDailyLatLatLonLon\n      lon: "{root.longitude}"\n      key: "{context.headers[\'x-weather-api-key\']}" # x-weather-api-key coming from HTTP Headers\n  - type: PopulatedPlaceSummary\n    field: todayForecast\n    requiredSelectionSet: |\n      {\n        latitude\n        longitude\n      }\n    targetSource: Weather\n    targetMethod: getForecastDailyLatLatLonLon\n    returnData: data[0]\n    args:\n      lat: "{root.latitude}"\n      lon: "{root.longitude}"      \n      key: "{context.headers[\'x-weather-api-key\']}"\n')),Object(o.b)("p",null,"The declaration above equals to the following;"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"module.exports = {\n  PopulatedPlaceSummary: {\n    dailyForecast: {\n      selectionSet: `\n        {\n          latitude\n          longitude\n        }\n      `,\n      resolve: async (root, args, context, info) => {\n        const result = await context.Weather.api.getForecastDailyLatLatLonLon({\n          lat: root.latitude,\n          lon: root.longitude,\n          key: context.headers['x-weather-api-key']\n        });\n        return result?.data;\n      },\n    },    \n    todayForecast: {\n      selectionSet: `\n        {\n          latitude\n          longitude\n        }\n      `,\n      resolve: (root, args, context, info) => {        \n        const result = await context.Weather.api.getForecastDailyLatLatLonLon({\n          lat: root.latitude,\n          lon: root.longitude,\n          key: context.headers['x-weather-api-key']\n        });\n        return result?.data?.length && result.data[0];\n      },\n    }\n\n  }\n}\n")))}p.isMDXComponent=!0},343:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return b}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),p=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=p(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=a,b=d["".concat(i,".").concat(m)]||d[m]||u[m]||o;return n?r.a.createElement(b,s(s({ref:t},c),{},{components:n})):r.a.createElement(b,s({ref:t},c))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);