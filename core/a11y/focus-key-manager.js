import { ListKeyManager } from './list-key-manager';
export class FocusKeyManager extends ListKeyManager {
    /**
     * @param {?} items
     */
    constructor(items) {
        super(items);
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     * @param {?} index
     * @return {?}
     */
    setActiveItem(index) {
        super.setActiveItem(index);
        this.activeItem.focus();
    }
}
//# sourceMappingURL=focus-key-manager.js.map