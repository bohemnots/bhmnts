import React from "react";
import styled from "styled-components";

import { HOST_URL } from "../config";
import { IMeta, METADATA } from "../context";
import { useAppContext } from "../hooks";

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
  const meta = useAppContext().meta || props.meta;
  const [message, setMessage] = React.useState("");

  function onSubmit(e) {
    const { target } = e;
    e.preventDefault();

    const newData = {
      text1: target.text1.value,
      text2: target.text2.value,
      link: target.link.value,
      linkTitle: target.linkTitle.value,
      linkColor: target.linkColor.value,
      linkBackground: target.linkBackground.value,
      imgUrl: target.imgUrl.value,
      t1Color: target.t1Color.value,
      t1Background: target.t1Background.value,
      t2Color: target.t2Color.value,
      t2Background: target.t2Background.value,
      streamUrl: target.streamUrl.value,
      actionColor: target.actionColor.value,
      size: target.size.value,
      password: target.password.value,
    };

    fetch(METADATA.URL, {
      method: "PATCH",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setMessage("success");
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((err) => setMessage(err.message));
  }
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <th align="center" colSpan={3}>
                <label>Text 1</label>
              </th>
            </tr>
            <tr>
              <td>
                <Label htmlFor="text1">Value: </Label>
              </td>
              <td>
                <input type="text" name="text1" defaultValue={meta.text1} />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="t1Color">Color: </Label>
              </td>
              <td>
                <input type="text" name="t1Color" defaultValue={meta.t1Color} />
              </td>
              <td>
                <Block meta={meta} />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="t1Background">Background: </Label>
              </td>
              <td>
                <input
                  type="text"
                  name="t1Background"
                  defaultValue={meta.t1Background}
                />
              </td>
              <td>
                <Block meta={meta} />
              </td>
            </tr>
            <tr>
              <th align="center" colSpan={3}>
                <label>Text 2</label>
              </th>
            </tr>
            <tr>
              <td>
                <Label htmlFor="text2">Value: </Label>
              </td>
              <td>
                <textarea name="text2" defaultValue={meta.text2} />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="t2Color">Color: </Label>
              </td>
              <td>
                <input type="text" name="t2Color" defaultValue={meta.t2Color} />
              </td>
              <td>
                <Block meta={meta} />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="t2Background">Background: </Label>
              </td>
              <td>
                <input
                  type="text"
                  name="t2Background"
                  defaultValue={meta.t2Background}
                />
              </td>
              <td>
                <div
                  className="block"
                  style={{ backgroundColor: meta.t2Background }}
                ></div>
              </td>
            </tr>
            <tr>
              <th align="center" colSpan={3}>
                <label>Link</label>
              </th>
            </tr>
            <tr>
              <td>
                <Label htmlFor="link">Value: </Label>
              </td>
              <td>
                <input type="text" name="link" defaultValue={meta.link} />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="linkTitle">Title: </Label>
              </td>
              <td>
                <input
                  type="text"
                  name="linkTitle"
                  defaultValue={meta.linkTitle}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="linkColor">Color: </Label>
              </td>
              <td>
                <input
                  type="text"
                  name="linkColor"
                  defaultValue={meta.linkColor}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="linkBackground">Background: </Label>
              </td>
              <td>
                <input
                  type="text"
                  name="linkBackground"
                  defaultValue={meta.linkBackground}
                />
              </td>
            </tr>
            <tr>
              <th align="center" colSpan={3}>
                <label>Stream</label>
              </th>
            </tr>
            <tr>
              <td>
                <Label htmlFor="streamUrl">Stream URL: </Label>
              </td>
              <td>
                <input
                  type="text"
                  name="streamUrl"
                  defaultValue={meta.streamUrl}
                />
              </td>
            </tr>
            <tr>
              <th align="center" colSpan={3}>
                <label>Other</label>
              </th>
            </tr>
            <tr>
              <td>
                <Label htmlFor="imgUrl">Image URL: </Label>
              </td>
              <td>
                <input type="text" name="imgUrl" defaultValue={meta.imgUrl} />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="actionColor">Action Color: </Label>
              </td>
              <td>
                <input
                  type="text"
                  name="actionColor"
                  defaultValue={meta.actionColor}
                />
              </td>
              <td>
                <Block meta={meta}></Block>
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="size">{"Size in 'rem': "}</Label>
              </td>
              <td>
                <input type="text" name="size" defaultValue={meta.size} />
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <hr />
              </td>
            </tr>
            <tr>
              <td>
                <Label htmlFor="password">Password: </Label>
              </td>
              <td>
                <input type="password" name="password" defaultValue={""} />
              </td>
              <td>
                <input type="submit" value="Update" />
              </td>
            </tr>
            <tr>
              <td>{message}</td>
            </tr>
          </tbody>
        </table>
        <br />
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: inline-block;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: inset 0 0 5px #999;

  & input,
  & textarea {
    background-color: transparent;
    border: black solid 3px;
    height: 30px;
  }

  & input,
  & textarea {
    border-color: #000;
    color: #000;
    font-size: 20px;
  }

  & td {
    text-align: right;
    padding: 2px;
  }
`;

const Label = styled.label`
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
`;

interface IMetaProps {
  meta: IMeta;
}

const Block = styled.div<IMetaProps>`
  margin: 10px;
  height: 20px;
  width: 20px;
  display: inline-block;
  background-color: ${(props) => props.meta.actionColor || "#000"};
  vertical-align: middle;
`;
