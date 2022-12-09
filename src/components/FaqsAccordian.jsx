import _html from "helper/_html";
import Accordion from "react-bootstrap/Accordion";

function FaqsAccordian({ data }) {
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      {data.map((item, ind) => {
        const {heading = '', description = ''} = JSON.parse(item.content);
        return <>
        <Accordion.Item eventKey={ind}>
          <Accordion.Header>{heading}</Accordion.Header>
          <Accordion.Body>{_html(description)}</Accordion.Body>
        </Accordion.Item> 
        </> 
      })}
    </Accordion>
  );
}

export default FaqsAccordian;
