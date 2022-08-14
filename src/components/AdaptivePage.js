import { Dropdown } from "react-bootstrap";
import { IoChevronDown } from "react-icons/io5";

export default function AdaptivePage() {
  return (
    <div className="App-header">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic-button">
          ADAPTIVE PREPROCESSING MODE
          <IoChevronDown
            style={{
              width: "1.5rem",
              height: "1.5rem",
              marginLeft: "5px",
            }}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu
          style={{
            position: "absolute",
            minWidth: "100%",
            textAlign: "center",
          }}
        >
          <Dropdown.Item className="dropdown-item" eventKey="all">
            Automatic
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item" eventKey="rest">
            Manual
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div style={{ float: "right", marginRight: "46px" }}>
        <button className="save-btn">Preview</button>{" "}
        <div style={{ float: "right" }}>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic-button">
              CONFIRM ADAPTIVE
              <IoChevronDown
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  marginLeft: "5px",
                }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{
                position: "absolute",
                minWidth: "100%",
                textAlign: "center",
              }}
            >
              <Dropdown.Item className="dropdown-item" eventKey="all">
                Apply Automatic All
              </Dropdown.Item>
              <Dropdown.Item className="dropdown-item" eventKey="rest">
                Apply Automatic Remaining
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
