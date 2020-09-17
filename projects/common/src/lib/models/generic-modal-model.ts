export class GenericModalgModel {
    public Confirmation: boolean;
    public Component: any;
    public Title: string;
    public CancelButtonLabel: string;
    public ActionButtonLabel: string;
    public Message?: string;

    constructor(opts: GenericModalgModel) {
        Object.assign(this, opts); // destructure values
    }
}