/**
 * The interface for the State object.
 *
 * @since 3.0.0
 */
export interface StateObject {
    set(state: number): void;
    is(states: number | number[]): boolean;
}
/**
 * The function providing a super simple state system.
 *
 * @param initialState - Specifies the initial state.
 */
export declare function State(initialState: number): StateObject;
//# sourceMappingURL=../../../../src/js/constructors/State/State.d.ts.map