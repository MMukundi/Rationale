"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compute_1 = require("./compute");
const comprehend_1 = require("./comprehend");
var Rationale;
(function (Rationale) {
    Rationale.version = "0.01";
    Rationale.Comprehend = comprehend_1.Comprehend;
    Rationale.Compute = compute_1.Compute;
})(Rationale = exports.Rationale || (exports.Rationale = {}));
console.log("Rationale built");
//tsc --outFile built/rationale.js src/compute.ts src/comprehend.ts src/rationale.ts
//tsc --outFile built/main.js src/main.ts
