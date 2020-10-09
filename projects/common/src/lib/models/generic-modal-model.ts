import { ComponentProperties } from './generic-modal-properties.model';

/**
 * Define a custom data type with restricted values
 *
 * This tells us if the modal is being used as a confirmation
 * or something more complex
 */
type ModalType = 'confirm' | 'data' | 'info';

export class GenericModalModel {

    /**
     * Callback function on confirmation
     * */
    public CallbackAction?: Function;

    /**
     * Callback function on cancel
     */
    public CallbackCancel?: Function;

    /**
     * Component to be used in the modal
     */
    public Component?: any;

    /**
     * Lable for action button
     */
    public LabelAction?: string;

    /**
     * Label for cancel button
     */
    public LabelCancel?: string;

    /**
     * Content message
     */
    public Message?: string;

    /**
     * Type of modal being used (confirmation or data)
     */
    public ModalType?: ModalType = 'data';

    /**
     * Modal title
     */
    public Title?: string;

    /**
     * Component properties
     */
    public Properties?: ComponentProperties[];

    /**
     * Modal width
     */
    public Width?: string;

    constructor(opts: GenericModalModel) {
        Object.assign(this, opts); // destructure values
    }
}
