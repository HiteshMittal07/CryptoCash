"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./components/component.tsx":
/*!**********************************!*\
  !*** ./components/component.tsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.mjs\");\n/* harmony import */ var _utils_noir__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/noir */ \"./utils/noir.ts\");\n/* harmony import */ var _circuits_target_noirstarter_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../circuits/target/noirstarter.json */ \"./circuits/target/noirstarter.json\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Component() {\n    _s();\n    const [input, setInput] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        x: 0,\n        y: 0\n    });\n    const [proof, setProof] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(Uint8Array.from([]));\n    const [noir, setNoir] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(new _utils_noir__WEBPACK_IMPORTED_MODULE_3__.Noir(_circuits_target_noirstarter_json__WEBPACK_IMPORTED_MODULE_4__));\n    // Handles input state\n    const handleChange = (e)=>{\n        e.preventDefault();\n        setInput({\n            ...input,\n            [e.target.name]: e.target.value\n        });\n    };\n    // Calculates proof\n    const calculateProof = async ()=>{\n        const calc = new Promise(async (resolve, reject)=>{\n            const witness = await noir.generateWitness(input);\n            const proof = await noir.generateProof(witness);\n            setProof(proof);\n            resolve(proof);\n        });\n        react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.promise(calc, {\n            pending: \"Calculating proof...\",\n            success: \"Proof calculated!\",\n            error: \"Error calculating proof\"\n        });\n    };\n    const verifyProof = async ()=>{\n        const verifyOffChain = new Promise(async (resolve, reject)=>{\n            if (proof) {\n                const verification = await noir.verifyProof(proof);\n                resolve(verification);\n            }\n        });\n        react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.promise(verifyOffChain, {\n            pending: \"Verifying proof off-chain...\",\n            success: \"Proof verified off-chain!\",\n            error: \"Error verifying proof\"\n        });\n    };\n    // Verifier the proof if there's one in state\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (proof.length > 0) {\n            verifyProof();\n            return ()=>{\n                noir.destroy();\n            };\n        }\n    }, [\n        proof\n    ]);\n    const initNoir = async ()=>{\n        const init = new Promise(async (resolve, reject)=>{\n            await noir.init();\n            setNoir(noir);\n            resolve(noir);\n        });\n        react_toastify__WEBPACK_IMPORTED_MODULE_2__.toast.promise(init, {\n            pending: \"Initializing Noir...\",\n            success: \"Noir initialized!\",\n            error: \"Error initializing Noir\"\n        });\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        initNoir();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"gameContainer\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"verifying that crypto cash have the sufficent value so that it can be reedmed but \"\n            }, void 0, false, {\n                fileName: \"/Users/pavitraagarwal/Desktop/ETHINDIA/noir-in-an-afternoon-master 2/browser/components/component.tsx\",\n                lineNumber: 80,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                children: \"This circuit checks balance of the account and the denomination of the crpto cash\"\n            }, void 0, false, {\n                fileName: \"/Users/pavitraagarwal/Desktop/ETHINDIA/noir-in-an-afternoon-master 2/browser/components/component.tsx\",\n                lineNumber: 81,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {}, void 0, false, {\n                fileName: \"/Users/pavitraagarwal/Desktop/ETHINDIA/noir-in-an-afternoon-master 2/browser/components/component.tsx\",\n                lineNumber: 82,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                name: \"account\",\n                type: \"number\",\n                onChange: handleChange,\n                value: input.x\n            }, void 0, false, {\n                fileName: \"/Users/pavitraagarwal/Desktop/ETHINDIA/noir-in-an-afternoon-master 2/browser/components/component.tsx\",\n                lineNumber: 83,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                name: \"y\",\n                type: \"number\",\n                onChange: handleChange,\n                value: input.y\n            }, void 0, false, {\n                fileName: \"/Users/pavitraagarwal/Desktop/ETHINDIA/noir-in-an-afternoon-master 2/browser/components/component.tsx\",\n                lineNumber: 84,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: calculateProof,\n                children: \"Calculate proof\"\n            }, void 0, false, {\n                fileName: \"/Users/pavitraagarwal/Desktop/ETHINDIA/noir-in-an-afternoon-master 2/browser/components/component.tsx\",\n                lineNumber: 85,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/pavitraagarwal/Desktop/ETHINDIA/noir-in-an-afternoon-master 2/browser/components/component.tsx\",\n        lineNumber: 79,\n        columnNumber: 5\n    }, this);\n}\n_s(Component, \"wRVkuwWhYG07A59k8Lfg+d6J2zo=\");\n_c = Component;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Component);\nvar _c;\n$RefreshReg$(_c, \"Component\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2NvbXBvbmVudC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE0QztBQUVMO0FBQ2I7QUFDVztBQUNvQjtBQUV6RCxTQUFTTTs7SUFDUCxNQUFNLENBQUNDLE9BQU9DLFNBQVMsR0FBR1IsK0NBQVFBLENBQUM7UUFBRVMsR0FBRztRQUFHQyxHQUFHO0lBQUU7SUFDaEQsTUFBTSxDQUFDQyxPQUFPQyxTQUFTLEdBQUdaLCtDQUFRQSxDQUFDYSxXQUFXQyxJQUFJLENBQUMsRUFBRTtJQUNyRCxNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR2hCLCtDQUFRQSxDQUFDLElBQUlJLDZDQUFJQSxDQUFDQyw4REFBT0E7SUFFakQsc0JBQXNCO0lBQ3RCLE1BQU1ZLGVBQWVDLENBQUFBO1FBQ25CQSxFQUFFQyxjQUFjO1FBQ2hCWCxTQUFTO1lBQUUsR0FBR0QsS0FBSztZQUFFLENBQUNXLEVBQUVFLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLEVBQUVILEVBQUVFLE1BQU0sQ0FBQ0UsS0FBSztRQUFDO0lBQ3ZEO0lBRUEsbUJBQW1CO0lBQ25CLE1BQU1DLGlCQUFpQjtRQUNyQixNQUFNQyxPQUFPLElBQUlDLFFBQVEsT0FBT0MsU0FBU0M7WUFDdkMsTUFBTUMsVUFBVSxNQUFNYixLQUFLYyxlQUFlLENBQUN0QjtZQUMzQyxNQUFNSSxRQUFRLE1BQU1JLEtBQUtlLGFBQWEsQ0FBQ0Y7WUFDdkNoQixTQUFTRDtZQUNUZSxRQUFRZjtRQUNWO1FBQ0FULGlEQUFLQSxDQUFDNkIsT0FBTyxDQUFDUCxNQUFNO1lBQ2xCUSxTQUFTO1lBQ1RDLFNBQVM7WUFDVEMsT0FBTztRQUNUO0lBQ0Y7SUFFQSxNQUFNQyxjQUFjO1FBQ2xCLE1BQU1DLGlCQUFpQixJQUFJWCxRQUFRLE9BQU9DLFNBQVNDO1lBQ2pELElBQUloQixPQUFPO2dCQUNULE1BQU0wQixlQUFlLE1BQU10QixLQUFLb0IsV0FBVyxDQUFDeEI7Z0JBQzVDZSxRQUFRVztZQUNWO1FBQ0Y7UUFFQW5DLGlEQUFLQSxDQUFDNkIsT0FBTyxDQUFDSyxnQkFBZ0I7WUFDNUJKLFNBQVM7WUFDVEMsU0FBUztZQUNUQyxPQUFPO1FBQ1Q7SUFDRjtJQUVBLDZDQUE2QztJQUM3Q2pDLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSVUsTUFBTTJCLE1BQU0sR0FBRyxHQUFHO1lBQ3BCSDtZQUVBLE9BQU87Z0JBQ0xwQixLQUFLd0IsT0FBTztZQUNkO1FBQ0Y7SUFDRixHQUFHO1FBQUM1QjtLQUFNO0lBRVYsTUFBTTZCLFdBQVc7UUFDZixNQUFNQyxPQUFPLElBQUloQixRQUFRLE9BQU9DLFNBQVNDO1lBQ3ZDLE1BQU1aLEtBQUswQixJQUFJO1lBQ2Z6QixRQUFRRDtZQUNSVyxRQUFRWDtRQUNWO1FBRUFiLGlEQUFLQSxDQUFDNkIsT0FBTyxDQUFDVSxNQUFNO1lBQ2xCVCxTQUFTO1lBQ1RDLFNBQVM7WUFDVEMsT0FBTztRQUNUO0lBQ0Y7SUFFQWpDLGdEQUFTQSxDQUFDO1FBQ1J1QztJQUNGLEdBQUcsRUFBRTtJQUVMLHFCQUNFLDhEQUFDRTtRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0M7MEJBQUc7Ozs7OzswQkFDSiw4REFBQ0M7MEJBQUc7Ozs7OzswQkFDSiw4REFBQ0M7Ozs7OzBCQUNELDhEQUFDdkM7Z0JBQU1jLE1BQUs7Z0JBQVUwQixNQUFNO2dCQUFVQyxVQUFVL0I7Z0JBQWNLLE9BQU9mLE1BQU1FLENBQUM7Ozs7OzswQkFDNUUsOERBQUNGO2dCQUFNYyxNQUFLO2dCQUFJMEIsTUFBTTtnQkFBVUMsVUFBVS9CO2dCQUFjSyxPQUFPZixNQUFNRyxDQUFDOzs7Ozs7MEJBQ3RFLDhEQUFDdUM7Z0JBQU9DLFNBQVMzQjswQkFBZ0I7Ozs7Ozs7Ozs7OztBQUd2QztHQWhGU2pCO0tBQUFBO0FBa0ZULCtEQUFlQSxTQUFTQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvY29tcG9uZW50LnRzeD9jZTdhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAncmVhY3QtdG9hc3RpZnknO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE5vaXIgfSBmcm9tICcuLi91dGlscy9ub2lyJztcbmltcG9ydCBjaXJjdWl0IGZyb20gXCIuLi9jaXJjdWl0cy90YXJnZXQvbm9pcnN0YXJ0ZXIuanNvblwiXG5cbmZ1bmN0aW9uIENvbXBvbmVudCgpIHtcbiAgY29uc3QgW2lucHV0LCBzZXRJbnB1dF0gPSB1c2VTdGF0ZSh7IHg6IDAsIHk6IDAgfSk7XG4gIGNvbnN0IFtwcm9vZiwgc2V0UHJvb2ZdID0gdXNlU3RhdGUoVWludDhBcnJheS5mcm9tKFtdKSk7XG4gIGNvbnN0IFtub2lyLCBzZXROb2lyXSA9IHVzZVN0YXRlKG5ldyBOb2lyKGNpcmN1aXQpKTtcblxuICAvLyBIYW5kbGVzIGlucHV0IHN0YXRlXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRJbnB1dCh7IC4uLmlucHV0LCBbZS50YXJnZXQubmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pO1xuICB9O1xuXG4gIC8vIENhbGN1bGF0ZXMgcHJvb2ZcbiAgY29uc3QgY2FsY3VsYXRlUHJvb2YgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY2FsYyA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHdpdG5lc3MgPSBhd2FpdCBub2lyLmdlbmVyYXRlV2l0bmVzcyhpbnB1dCk7XG4gICAgICBjb25zdCBwcm9vZiA9IGF3YWl0IG5vaXIuZ2VuZXJhdGVQcm9vZih3aXRuZXNzKTtcbiAgICAgIHNldFByb29mKHByb29mKTtcbiAgICAgIHJlc29sdmUocHJvb2YpO1xuICAgIH0pO1xuICAgIHRvYXN0LnByb21pc2UoY2FsYywge1xuICAgICAgcGVuZGluZzogJ0NhbGN1bGF0aW5nIHByb29mLi4uJyxcbiAgICAgIHN1Y2Nlc3M6ICdQcm9vZiBjYWxjdWxhdGVkIScsXG4gICAgICBlcnJvcjogJ0Vycm9yIGNhbGN1bGF0aW5nIHByb29mJyxcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCB2ZXJpZnlQcm9vZiA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB2ZXJpZnlPZmZDaGFpbiA9IG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmIChwcm9vZikge1xuICAgICAgICBjb25zdCB2ZXJpZmljYXRpb24gPSBhd2FpdCBub2lyLnZlcmlmeVByb29mKHByb29mKTtcbiAgICAgICAgcmVzb2x2ZSh2ZXJpZmljYXRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdG9hc3QucHJvbWlzZSh2ZXJpZnlPZmZDaGFpbiwge1xuICAgICAgcGVuZGluZzogJ1ZlcmlmeWluZyBwcm9vZiBvZmYtY2hhaW4uLi4nLFxuICAgICAgc3VjY2VzczogJ1Byb29mIHZlcmlmaWVkIG9mZi1jaGFpbiEnLFxuICAgICAgZXJyb3I6ICdFcnJvciB2ZXJpZnlpbmcgcHJvb2YnLFxuICAgIH0pO1xuICB9O1xuXG4gIC8vIFZlcmlmaWVyIHRoZSBwcm9vZiBpZiB0aGVyZSdzIG9uZSBpbiBzdGF0ZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwcm9vZi5sZW5ndGggPiAwKSB7XG4gICAgICB2ZXJpZnlQcm9vZigpO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBub2lyLmRlc3Ryb3koKTtcbiAgICAgIH07XG4gICAgfVxuICB9LCBbcHJvb2ZdKTtcblxuICBjb25zdCBpbml0Tm9pciA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBpbml0ID0gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgbm9pci5pbml0KCk7XG4gICAgICBzZXROb2lyKG5vaXIpO1xuICAgICAgcmVzb2x2ZShub2lyKTtcbiAgICB9KTtcblxuICAgIHRvYXN0LnByb21pc2UoaW5pdCwge1xuICAgICAgcGVuZGluZzogJ0luaXRpYWxpemluZyBOb2lyLi4uJyxcbiAgICAgIHN1Y2Nlc3M6ICdOb2lyIGluaXRpYWxpemVkIScsXG4gICAgICBlcnJvcjogJ0Vycm9yIGluaXRpYWxpemluZyBOb2lyJyxcbiAgICB9KTtcbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGluaXROb2lyKCk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2FtZUNvbnRhaW5lclwiPlxuICAgICAgPGgxPnZlcmlmeWluZyB0aGF0IGNyeXB0byBjYXNoIGhhdmUgdGhlIHN1ZmZpY2VudCB2YWx1ZSBzbyB0aGF0IGl0IGNhbiBiZSByZWVkbWVkIGJ1dCA8L2gxPlxuICAgICAgPGgyPlRoaXMgY2lyY3VpdCBjaGVja3MgYmFsYW5jZSBvZiB0aGUgYWNjb3VudCBhbmQgdGhlIGRlbm9taW5hdGlvbiBvZiB0aGUgY3JwdG8gY2FzaDwvaDI+XG4gICAgICA8cD48L3A+XG4gICAgICA8aW5wdXQgbmFtZT1cImFjY291bnRcIiB0eXBlPXsnbnVtYmVyJ30gb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX0gdmFsdWU9e2lucHV0Lnh9IC8+XG4gICAgICA8aW5wdXQgbmFtZT1cInlcIiB0eXBlPXsnbnVtYmVyJ30gb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX0gdmFsdWU9e2lucHV0Lnl9IC8+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9e2NhbGN1bGF0ZVByb29mfT5DYWxjdWxhdGUgcHJvb2Y8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidG9hc3QiLCJSZWFjdCIsIk5vaXIiLCJjaXJjdWl0IiwiQ29tcG9uZW50IiwiaW5wdXQiLCJzZXRJbnB1dCIsIngiLCJ5IiwicHJvb2YiLCJzZXRQcm9vZiIsIlVpbnQ4QXJyYXkiLCJmcm9tIiwibm9pciIsInNldE5vaXIiLCJoYW5kbGVDaGFuZ2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJuYW1lIiwidmFsdWUiLCJjYWxjdWxhdGVQcm9vZiIsImNhbGMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIndpdG5lc3MiLCJnZW5lcmF0ZVdpdG5lc3MiLCJnZW5lcmF0ZVByb29mIiwicHJvbWlzZSIsInBlbmRpbmciLCJzdWNjZXNzIiwiZXJyb3IiLCJ2ZXJpZnlQcm9vZiIsInZlcmlmeU9mZkNoYWluIiwidmVyaWZpY2F0aW9uIiwibGVuZ3RoIiwiZGVzdHJveSIsImluaXROb2lyIiwiaW5pdCIsImRpdiIsImNsYXNzTmFtZSIsImgxIiwiaDIiLCJwIiwidHlwZSIsIm9uQ2hhbmdlIiwiYnV0dG9uIiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/component.tsx\n"));

/***/ })

});