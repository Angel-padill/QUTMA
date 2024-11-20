import { Schema,model} from "mongoose";

interface IQuestion{
    title: String;
    typo: "radio" | "chackbox" | "select" | "text",
    isMandatory:boolean,
    questionaireId:Schema.Types.ObjectId | String;
}

const QuestionSchema = new Schema<IQuestion>({
    title: {
        type: String,
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

    questionaireId:{
        type: Schema.Types.ObjectId,
        ref:"questionaires",
        required:true
    }
       
});

export const QuestionModel = model("questions", QuestionSchema);