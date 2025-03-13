import { useEffect, useState, useRef } from "react";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface FieldConfig<T extends FieldValues> {
  name: keyof T;
  label: string;
  type: "text" | "textarea" | "file";
}

interface DialogProps<T extends FieldValues> {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  schema: ZodSchema<T>;
  initialValues: DefaultValues<T>;
  fields: FieldConfig<T>[];
}

const Dialog = <T extends FieldValues,>({
  show,
  onClose,
  onSubmit,
  schema,
  initialValues,
  fields,
}: DialogProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<T>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  const img = watch("img" as Path<T>);
  const [preview, setPreview] = useState<string>("./images/upload_image_sample.png");
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  useEffect(() => {
    if (img) {
      setPreview(URL.createObjectURL(img));
    }
  }, [img]);

  const onSubmitHandler = (data: T) => {
    onSubmit(data);
    reset();
    onClose();
  };
  const { ref, ...rest } = register("img" as Path<T>);

  return (
    <>
      {show && <div className="modal-backdrop fade show"></div>} {/* Dark background */}
      <div className={`modal ${show ? "show d-block" : "d-none"}`} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Post</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {fields.map((field) => (
                <div className="mb-3" key={String(field.name)}>
                  <label className="form-label">{field.label}</label>
                  {field.type === "text" && (
                    <input
                      {...register(field.name as Path<T>)}
                      type="text"
                      className="form-control"
                    />
                  )}
                  {field.type === "textarea" && (
                    <textarea
                      className="form-control"
                      rows={3}
                      {...register(field.name as Path<T>)}
                    ></textarea>
                  )}
                  {field.type === "file" && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <img src={preview} onClick={() => { inputFileRef.current?.click() }} style={{ width: '200px', height: '200px', alignSelf: 'center' }} />
                      </div>
                      <input
                        {...rest}
                        type="file"
                        className="form-control"
                        ref={(e) => { inputFileRef.current = e; }}
                        onChange={(e) => {
                          const file = e.target.files ? e.target.files[0] : null;
                          setValue(field.name as Path<T>, file as unknown as T[keyof T]);
                        }}
                        accept="image/jpeg, image/png"
                        style={{ display: 'none' }}
                      />
                    </>
                  )}
                  {errors[field.name] && (
                    <p className="text-danger">{(errors[field.name]?.message as string) || "Invalid input"}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                ביטול
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmitHandler)}>
                שליחה
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;

