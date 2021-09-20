import { FestLayout } from "components/Layout";
import { Formik, FormikProps } from "formik";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";

const initialValues = {
  name: "",
  surname: "",
  email: "",
  file: null,
  photo: null,
};

interface FormikValues {
  name: string;
  surname: string;
  email: string;
  file: any;
  photo: any;
}

const View = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    max-width: unset;
    margin: 12px;
  }
`;

interface NextButtonProps {}

const NextButton = styled.button<NextButtonProps>`
  font-size: 11pt;
  color: white;
  cursor: pointer;
  width: 120px;
  padding: 10px 20px;
  margin: 10px;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 24px;
  text-align: center;
  background-color: black;
  border-color: black;
  &.disabled {
    opacity: 0.5;
  }

  &.loading {
    @keyframes loading {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    animation: loading;
    animation-duration: 0.9s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
`;

const Error = styled.div`
  color: red;
  font-weight: bold;
  font-size: 14px;
`;

const Label = styled.label`
  color: white;
  text-align: left;
  font-size: 14px;
  border: 2px solid black;
  width: 250px;
  padding: 0;
`;

const Input = styled.input`
  color: white;
  display: block;
  margin-bottom: 15px;
  height: 28px;
  width: 250px;
  background-color: black;
  padding: 0;
  border: 2px solid white;
`;

const Photo = styled.div`
  position: relative;
  width: auto;
  max-width: 100vw;

  & img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const Remove = styled.button`
  display: block;
  margin: auto;
`;

export default function SendTicket() {
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const formik = useRef<FormikProps<FormikValues> | null>();

  const buy = useCallback(
    async (values) => {
      setIsLoading(true);
      try {
        const form = new FormData();

        form.append("name", values.name);
        form.append("surname", values.surname);
        form.append("email", (values.email + "").trim());
        form.append("photo", values.photo);

        const response = await fetch("/api/create-ticket", {
          method: "POST",
          body: form,
        });
        const data = await response.json();
        if (data.checkout?._id) {
          alert(`ticket have been sent to '${data.checkout.email}'`);
          console.warn(formik.current);
          if (formik.current) {
            formik.current.resetForm({ values: initialValues });
            formik.current.setStatus({ complete: true });
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  const isValid = (values) => {
    return !!(values.name && values.surname && values.email && values.photo);
  };

  return (
    <FestLayout showSignIn={true}>
      <Formik
        enableReinitialize
        innerRef={(_ref) => (formik.current = _ref)}
        onSubmit={buy}
        initialValues={{
          name: "",
          surname: "",
          email: "",
          file: null,
          photo: null,
        }}
        validationSchema={BuyTicket}
      >
        {({ values, errors, touched, setFieldValue, submitForm }) => {
          return (
            <View>
              <Label htmlFor="name">{"* name"}</Label>
              <Input
                onChange={(e) => setFieldValue("name", e.target.value)}
                name="name"
                required
              ></Input>
              <Error>{touched.name ? errors.name || " " : " "}</Error>

              <Label htmlFor="surname">{"* surname"}</Label>
              <Input
                onChange={(e) => setFieldValue("surname", e.target.value)}
                name="surname"
                required
              ></Input>
              <Error>{touched.surname ? errors.surname || " " : " "}</Error>

              <Label htmlFor="email">{"* email"}</Label>
              <Input
                onChange={(e) => setFieldValue("email", e.target.value)}
                name="email"
                required
              ></Input>
              <Error>{touched.email ? errors.email || " " : " "}</Error>

              <Label htmlFor="photo">{"* photo"}</Label>
              <input
                ref={ref}
                onChange={(e) => {
                  if (!e) {
                    return null;
                  }
                  const reader = new FileReader();
                  const file = e.target?.files?.[0];
                  if (file) {
                    if (file.size / 1024 > 5000) {
                      alert("file is too large, try files smaller than 5mb");
                      return;
                    }
                    reader.onloadend = () => {
                      setFieldValue("file", reader.result);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    setFieldValue("file", null);
                  }
                  setFieldValue("photo", file);
                }}
                accept="image/jpeg"
                type="file"
                name="photo"
                capture="user"
                required
                hidden={!!values.photo}
              ></input>
              {values.photo ? (
                <Remove
                  onClick={() => {
                    setFieldValue("file", null);
                    setFieldValue("photo", null);
                    if (ref.current) {
                      ref.current.value = "";
                    }
                  }}
                >
                  REMOVE
                </Remove>
              ) : null}
              <Photo>
                {values.photo ? (
                  <>
                    {values.file ? (
                      <Image
                        src={values.file || ""}
                        width="300"
                        height="300"
                        alt="Selected Image"
                      />
                    ) : null}
                  </>
                ) : null}
              </Photo>
              <Error>{errors.photo || " "}</Error>

              <NextButton
                disabled={!isValid(values)}
                className={
                  !isValid(values) ? "disabled" : isLoading ? "loading" : ""
                }
                onClick={submitForm}
              >
                {"next >"}
              </NextButton>
            </View>
          );
        }}
      </Formik>
    </FestLayout>
  );
}

const BuyTicket = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  surname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});
