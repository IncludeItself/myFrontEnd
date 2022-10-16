import {Ref, unref} from "vue";
import {FormInst} from "naive-ui";

export function useFormValid<T extends Object = any>(formRef: Ref<FormInst | null>) {
    function validForm() {
        const form = unref(formRef);
        if (!form) return;
        // const errors = await form.validate();
        // return errors;


        let errors;
        form.validate((a)=>{
            errors=a;
        });
        return errors;
    }

    return {validForm};
}
