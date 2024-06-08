
import { accountContactModel } from "./accountContactModel";
import { accountDocumentModel } from "./accountDocumentModel";
import { accountLoginUser } from "./accountLoginUser";

export class accountModel {
    /**
     *
     */
    constructor() {
        this.user=new accountLoginUser();

    }
id:number;
office_location_id:number;
level_priority:string;
name:string;
billing_address:string;
suit:string;
phone:number
state:string;
city:string;
zip_code:number
secondary_phone:number
billing_term_days:number
billing_method:number;
payment_method:string;
status:string;
notes:string;
portal_id:number=0;

//account portal:
is_portal:number;
user?:accountLoginUser;
documents:accountDocumentModel[]=[];
contacts:accountContactModel[]=[];
}