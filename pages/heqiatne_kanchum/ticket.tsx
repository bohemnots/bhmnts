/* eslint-disable @next/next/no-img-element */
import { Formik, FormikProps } from "formik";
import Link from "next/dist/client/link";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";

const linkStyle = { color: "white", cursor: "pointer" };
const purpleColor = "#8800ff";
const P = styled.p`
  font-size: 1.6em;
  color: ${purpleColor};
`;
const Heading = styled.p`
  font-size: 2em;
  color: ${purpleColor};
  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;
const CenteredWrapper = styled.div`
  max-width: 90%;
  margin: 0 auto;
  display: grid;
  place-items: center;
  color: ${purpleColor};
  text-align: center;
  margin-top: 10vh;
  @media (max-width: 768px) {
    margin-top: 1vh;
  }
`;
const Container = styled.div`
  color: white;
  background-color: black;
  width: 100vw;
  min-height: 100vh;
  display: grid;
  place-items: start;
`;

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

const Error = styled.div`
  color: red;
  font-weight: bold;
  font-size: 14px;
`;

const Label = styled.label`
  color: white;
  text-align: center;
  font-size: 1.2em;
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
  margin-bottom: 17px;
`;
const NextPageLink = () => {
  return (
    <Link href="heqiatne_kanchum/ticket">
      <span style={linkStyle}>
        <h2>BOOK TICKET</h2>
      </span>
    </Link>
  );
};
const Price = (props) => {
  const [, setIsLoading] = useState(false);
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

  return (
    <Container>
      <CenteredWrapper className={props.className}>
        <div>
          <Heading>
            Composers&apos; Union Dilijan <br />
            SEPTEMBER 2-4
          </Heading>
          <P style={{ marginBottom: "5px", fontSize: "1.3em" }}>
            100 limited edition tickets 5000amd + free bus <br />
            after 8000amd
          </P>
          <br />
        </div>
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
          {({ values, errors, touched, setFieldValue }) => {
            return (
              <View style={{ scale: "0.7" }}>
                <Label htmlFor="full_name">{"Full Name"}</Label>
                <Input
                  onChange={(e) => setFieldValue("full_name", e.target.value)}
                  name="full_name"
                  required
                ></Input>
                <Error>{touched.name ? errors.name || " " : " "}</Error>

                <Label htmlFor="email">{"Email"}</Label>
                <Input
                  onChange={(e) => setFieldValue("email", e.target.value)}
                  name="email"
                  required
                ></Input>
                <Error>{touched.email ? errors.email || " " : " "}</Error>
                {/* <Label htmlFor="photo">{"Choose photo"}</Label> */}
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
                  accept="image/png"
                  type="file"
                  name="photo"
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
                          width="120"
                          height="120"
                          alt="Selected Image"
                        />
                      ) : null}
                    </>
                  ) : null}
                </Photo>
                <Error>{errors.photo || " "}</Error>
              </View>
            );
          }}
        </Formik>
        <NextPageLink></NextPageLink>
        <div>
          <div style={{ width: "200px" }}>
            <img
              style={{ width: "100%" }}
              src="/images/karnaval-icons.png"
              alt=""
            />
          </div>
        </div>
      </CenteredWrapper>
    </Container>
  );
};

export default Price;

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
