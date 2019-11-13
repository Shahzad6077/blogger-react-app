import React from "react";
import ReactQuill from "react-quill"; // ES6
import PropTypes from "prop-types";

/*
  Simple editor component that takes placeholder text as a prop
*/

class Editor extends React.Component {
  state = { value: "", theme: "snow" };

  handleThemeChange = newTheme => {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  };

  render() {
    return (
      // style={{ position: "relative" }} ref="containerE"
      <div>
        {/* <CustomToolbar /> */}
        <ReactQuill
          theme={this.state.theme}
          onChange={this.props.handleChange}
          value={this.props.value}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={".app"}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}
/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  // [{ font: [] }],

  ["link", "image", "video"],
  [{ align: [] }],

  ["clean"] // remove formatting button
];

Editor.modules = {
  toolbar: toolbarOptions,
  // toolbar: {
  //   container: "#toolbar",
  //   handlers: toolbarOptions
  // },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "background",
  "bold",
  "color",
  "font",
  "code",
  "italic",
  "link",
  "size",
  "strike",
  "script",
  "underline",
  "blockquote",
  "header",
  "indent",
  "list",
  "align",
  "direction",
  "code-block",
  "image",
  "video",
  "formula"
];

/*
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string
};

/*
 * Render component on page
 */
export default Editor;

// const CustomToolbar = props => (
//   <Affix offsetTop={100} className="sticky-toolbar">
//     <div id="toolbar">
//       <select
//         className="ql-header"
//         defaultValue={""}
//         onChange={e => e.persist()}
//       >
//         <option value="1"></option>
//         <option value="2"></option>
//         <option></option>
//       </select>
//       <button className="ql-bold"></button>
//       <button className="ql-italic"></button>
//       <select className="ql-color">
//         <option value="red"></option>
//         <option value="green"></option>
//         <option value="blue"></option>
//         <option value="orange"></option>
//         <option value="violet"></option>
//         <option value="#d0d1d2"></option>
//         {/* <option></option> */}
//       </select>
//       <span class="ql-background ql-picker ql-color-picker ql-expanded"></span>
//     </div>
//   </Affix>
// );
