declare module '@splidejs/splide' {
  /**
   * The interface for the Move component.
   *
   * @since 3.0.0
   */
  interface MoveComponent extends BaseComponent {
    move( dest: number, index: number, prev: number ): void;
    jump( index: number ): void;
    translate( position: number ): void;
    cancel(): void;
    toIndex( position: number ): number;
    toPosition( index: number, trimming?: boolean ): number;
    getPosition(): number;
    getLimit( max: boolean ): number;
    isBusy(): boolean;
    isExceeded(): boolean;
    isExceededMin( position: number, offset?: number ): boolean;
    isExceededMax( position: number, offset?: number ): boolean;
  }

  /**
   * The interface for all components.
   *
   * @since 3.0.0
   */
  interface Components {
    Move: MoveComponent,
  }
}
