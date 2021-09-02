import { useField } from "formik";
import { Formik } from "formik";
import React, { useCallback } from "react";
import styled from "styled-components";

import { HOST_URL } from "../config";
import { IMeta, METADATA } from "../context";

export async function getServerSideProps() {
  const response = await fetch(`${HOST_URL}${METADATA.URL}`);
  const meta = await response.json();
  return {
    props: {
      meta: meta || {},
    },
  };
}

export default function EditPage(props) {
  const { meta } = props;
  const [message, setMessage] = React.useState("");

  const update = useCallback(async (values: IMeta) => {
    const response = await fetch(METADATA.URL, {
      method: "PATCH",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }, []);

  const handle = useCallback(
    async (values: IMeta) => {
      const response = await update(values);
      if (response.status === 200) {
        setMessage("success");
      } else {
        setMessage(await response.text());
      }
    },
    [update]
  );

  if (!meta) {
    return null;
  }

  return (
    <Container>
      <Formik<IMeta & { password: string }>
        onSubmit={update}
        initialValues={{ ...meta, password: "" }}
      >
        {({ values }) => {
          return (
            <table>
              <tbody>
                <Title>Text 1</Title>
                <Row name="text1" label="Value: " />
                <Row name="t1Color" label="Color: " isColor />
                <Row name="t1Background" label="Background: " isColor />
                <Title>Text 2</Title>
                <Row name="text2" label="Value: " />
                <Row name="t2Color" label="Color: " isColor />
                <Row name="t2Background" label="Background: " isColor />
                <Title>Link</Title>
                <Row name="link" label="Value:" />
                <Row name="linkTitle" label="Title:" />
                <Row name="linkColor" label="Color:" isColor />
                <Row name="linkBackground" label="Background:" isColor />
                <Title>Stream</Title>
                <Row name="streamUrl" label="Stream URL:" />
                <Title>Other</Title>
                <Row name="imgUrl" label="Image URL:" />
                <Row name="actionColor" label="Action Color:" isColor />
                <Row name="size" label="Size in 'rem': " />
                <Title />
                <Row type="password" name="password" label="Password: " />
                <Title>
                  <input
                    type="submit"
                    value="Update"
                    onClick={() => handle(values)}
                  />
                </Title>
                <Title>{message || " "}</Title>
              </tbody>
            </table>
          );
        }}
      </Formik>
    </Container>
  );
}

interface RowProps {
  name: string;
  label: string;
  type?: HTMLInputElement["type"];
  isColor?: boolean;
}

const Row: React.FC<RowProps> = (props) => {
  const { name, label, isColor } = props;
  const [field, , helper] = useField(name);

  const onChange = (e) => {
    helper.setValue(e.target.value);
  };

  return (
    <tr>
      <td>
        <Label htmlFor={name}>{label}</Label>
      </td>
      <td>
        {name.includes("text") ? (
          <textarea name={name} value={field.value} onChange={onChange} />
        ) : (
          <input
            type={props.type || "text"}
            name={name}
            value={field.value}
            onChange={onChange}
          />
        )}
      </td>
      {isColor ? (
        <td>
          <Block color={field.value} />
        </td>
      ) : null}
    </tr>
  );
};

const Container = styled.div`
  display: inline-block;
  background-color: #fff;
  padding: 20px;

  & input,
  & textarea {
    background-color: transparent;
    border: black solid 1px;
    border-color: #000;
    color: #000;
    font-size: 20px;
    width: 100%;
  }

  & td {
    text-align: right;
    padding-bottom: 1px;
  }
`;

const Label = styled.label`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
`;

interface TitleProps {}
const Title: React.FC<TitleProps> = (props) => {
  return (
    <tr>
      <th align="center" colSpan={3}>
        <Label>{props.children || <hr />}</Label>
      </th>
    </tr>
  );
};

interface IMetaProps {
  color?: string;
}

const Block = styled.div<IMetaProps>`
  margin: 10px;
  height: 20px;
  width: 20px;
  display: inline-block;
  border: 2px
    ${(props) =>
      props.color && props.color !== "transparent" ? "solid" : "dashed"}
    black;
  background-color: ${(props) => props.color || "transparent"};
  vertical-align: middle;
`;
