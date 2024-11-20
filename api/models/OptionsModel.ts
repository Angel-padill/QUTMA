import {Schema,model} from"mongoose";

interface IOptions{
    title:String,
    typo: "radio" | "chackbox" | "select" | "text",
    isMandatory:boolean,
    questionId: Schema.Types.ObjectId | string;
}

const OptionsSchema = new Schema<IOptions>({
    title: {
        type: String,
        required:true
    },
    questionId:{
        type: Schema.Types.ObjectId,
        ref:"questions",
        required:true
    },
    typo: {
        type: String,
        enum: ["radio", "checkbox", "select", "text"],
        required: true
    
    },
    isMandatory:{
        type:Boolean,
        required:true
    },

});

export const OptionsModel = model ("Options", OptionsSchema);