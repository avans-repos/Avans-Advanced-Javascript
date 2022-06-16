// Based on: https://stackoverflow.com/questions/35528395/make-directive-input-required
/**
 * Mark ``@Input()`` as required.
 *
 * Supports inheritance chains for components.
 *
 * Example:
 * ```TypeScript
 * import { Required, checkRequired } from '../required-input';
 *
 *  export class MyComp implements OnInit {
 *
 *    // Chain id paramter we check for from the wallet
 *    @Input()
 *    @isRequired
 *    requiredChainId: number;
 *
 *    ngOnInit(): void {
 *      checkRequired(this);
 *    }
 *  }
 * ```
 * @param target Object given by the TypeScript decorator
 * @param propertyKey Property name from the TypeScript decorator
 */
function Required(target: object, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    get() {
      throw new Error(`Attribute ${propertyKey} is required`);
    },
    set(value) {
      Object.defineProperty(target, propertyKey, {
        value,
        writable: true,
        configurable: true,
      });
    },
    configurable: true,
  });
}

export { Required };
