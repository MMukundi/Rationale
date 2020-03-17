// import { Compute as cp} from './compute';
// import { Comprehend as ch } from './comprehend';

export namespace Rationale {
    export const version = "0.01"
    // export const Comprehend = ch;
    // export const Compute = cp;
    export namespace Comprehend {
        export function isTrue(b: boolean): boolean {
            return b;
        }
    }

}
console.log("Rationale built")

//tsc --outFile built/rationale.js src/compute.ts src/comprehend.ts src/rationale.ts
//tsc --outFile built/main.js src/main.ts