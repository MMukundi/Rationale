export namespace Compute {
    /**The most basic, indivisible parts of any Chunk of any sort.
     * This is 
    */
   export interface MathObject {
        /** The addition of two arbitrary MathObjects */
        add(mo:MathObject):MathObject;
        multiply(mo:MathObject):MathObject;
        equals(mo:MathObject):boolean;
        clone():MathObject;
    }

    /** The Heirarcy of operations:
     * Addition will call Sum addition if possible
     * Multiplication will call Product multiplication if possible
     */

    /**The most basic numerical parts of any Chunk of any sort*/
    export class NumericalObject implements MathObject {
        /** The numerical value associated with this object (default = 1)*/
        value: number = 1;

        constructor(v: number) {
            this.value = v;
        }

        add(mo:MathObject):MathObject{
            if(mo instanceof NumericalObject){
                return new NumericalObject(this.value+mo.value);
            } else if(mo instanceof SumObject){
                let moClone = mo.clone();
                moClone.addends.push(this.clone())
                return moClone
            }
            return new SumObject([this.clone(), mo]);
        }
        multiply(mo:MathObject):MathObject{
            if(mo instanceof NumericalObject){
                return new NumericalObject(this.value*mo.value);
            }else if(mo instanceof ProductObject){
                let po = mo.clone()
                po.factors.push(this.clone())
                return po
            }
            return new ProductObject([this.clone(), mo]);
        }

        equals(mo:MathObject):boolean{
            if(mo instanceof NumericalObject){
                return mo.value===this.value;
            }
            return false;
        }

        clone(){
            return new NumericalObject(this.value);
        };
    }

    /**The most basic represvariable parts of any Chunk of any sort*/
    export class VariableObject implements MathObject {
        /** The letter or other symbol used to represent this variable (default = "x")*/
        readonly symbol: string;

        /** The letter or other symbol used to represent this variable (default = "")*/
        readonly subscript: string;

        constructor(s: string, sub: string) {
            this.symbol = ((s!==undefined)&&s.length === 1 && !s.includes("_")) ? s : "x"
            this.subscript = ((sub!==undefined)&&!sub.includes("_")) ? sub : ""
        }
        add(mo:MathObject):MathObject{
            if(mo instanceof SumObject){
                let moClone = mo.clone();
                moClone.addends.push(this.clone())
                return moClone
            }
            return new SumObject([this.clone(), mo]);
        }
        multiply(mo:MathObject):MathObject{
            // if(mo instanceof VariableObject){
            //     return new VariableObject(this.value*mo.value);
            // }
            if(mo instanceof ProductObject){
                let po = mo.clone()
                po.factors.push(this.clone())
                return po
            }
            return new ProductObject([this.clone(), mo]);
        }

        equals(mo:MathObject):boolean{
            if(mo instanceof VariableObject){
                return this.symbol===mo.symbol && this.subscript===mo.subscript;
            }
            return false;
        }

        clone(){
            return new VariableObject(this.symbol,this.subscript);
        };
        /** Produces the string representation the variable in the form "symbol_subscript" */
        toString(): string {
            return this.symbol + "_" + this.subscript;
        }
    }

    /** The mapping of all named variables to their MathObjects */
    export class VariableMap extends Map<string, MathObject>{}

    export class SumObject implements MathObject {
        addends: Array<MathObject> = [];
        constructor(adds:MathObject[]){
            this.addends = adds
        }
        add(mo:MathObject):MathObject{
            if(mo instanceof SumObject){
                let addends = this.addends.map((mo_)=>mo_.clone())
                addends.push(...mo.addends.map((mo_)=>mo_.clone()))
                return new SumObject(addends);
            }
            let clone = this.clone()
            clone.addends.push(mo.clone())
            return clone
        }
        multiply(mo:MathObject):MathObject{
            if(mo instanceof ProductObject){
                let po = mo.clone()
                po.factors.push(this.clone())
                return po
            }
            return new ProductObject([this.clone(), mo]);
        }
        distribute(mo:MathObject):MathObject{
            let addends = this.addends.map((mo_)=>mo_.clone().multiply(mo))
            return new ProductObject(addends);
        }        

        equals(mo:MathObject):boolean{
            if(mo instanceof SumObject){
                let indexesMatched = new Set<number>()
                let match = true;
                for(let addend of this.addends){
                    let index = mo.addends.findIndex((addend_,i)=>(!indexesMatched.has(i)&&addend_.equals(addend)))
                    if(index==-1){
                        match = false
                        break
                    }
                }
                return match
            }
            return false;
        }

        clone(){
            return new SumObject(this.addends.map((mo)=>mo.clone()));
        };       
    }

    export class ProductObject implements MathObject {
        factors: Array<MathObject> = [];
        constructor(fs:MathObject[]){
            this.factors = fs
        }    
        add(mo:MathObject):MathObject{
            if(mo instanceof SumObject){
                let moClone = mo.clone();
                moClone.addends.push(this.clone())
                return moClone
            }
            return new SumObject([this.clone(), mo]);
        }
        multiply(mo:MathObject):MathObject{
            if(mo instanceof ProductObject){
                let factors = this.factors.map((mo_)=>mo_.clone())
                factors.push(...mo.factors.map((mo_)=>mo_.clone()))
                return new ProductObject(factors);
            }
            let clone = this.clone()
            clone.factors.push(mo.clone())
            return clone;
        }   

        equals(mo:MathObject):boolean{
            if(mo instanceof ProductObject){
                let indexesMatched = new Set<number>()
                let match = true;
                for(let factor of this.factors){
                    let index = mo.factors.findIndex((factor_,i)=>(!indexesMatched.has(i)&&factor_.equals(factor)))
                    if(index==-1){
                        match = false
                        break
                    }
                }
                return match&&indexesMatched.size==mo.factors.length
            }
            return false;
        }

        clone(){
            return new ProductObject(this.factors.map((mo)=>mo.clone()));
        };   
    }

    export function add(a: number, b: number): number {
        return (<NumericalObject>(new NumericalObject(a).add(new NumericalObject(b)))).value
    }
    export function multiply(a: number, b: number): number {
        return (<NumericalObject>new NumericalObject(a).multiply(new NumericalObject(b))).value;
    }
    // /** Any stated relationship between two or more MathObjects*/
    // interface Relationship { }

    // /** Any stated relationship between two MathObjects*/
    // interface BinaryRelationship<L extends MathObject, R extends MathObject> extends Relationship { }

    // /** Any change to any given MathObject(s)*/
    // interface Operator {
    //     operate: Function;
    // }

    // /** Any change to two MathObject(s)*/
    // class BinaryOperator implements Operator {
    //     operate: (l: MathObject, r: MathObject) => MathObject;
    //     constructor(f: (l: MathObject, r: MathObject) => MathObject) {
    //         this.operate = f;
    //     }
    // }

}
