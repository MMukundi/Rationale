"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rationale = __importStar(require("./rationale"));
console.log(Rationale.Rationale.Compute.add(1, 2));
console.log(Rationale.Rationale.Comprehend.isTrue(false));
