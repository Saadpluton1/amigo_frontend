import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import _html from "helper/_html";
function TimeLine({ sections }) {
  return (
    <div>
      <VerticalTimeline>
        {
          sections.map((item) => {
            const {heading = '',sub_heading = '',description = ''} = JSON.parse(item.content)
            return <>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: "#ffffff", color: "#000" }}
                contentArrowStyle={{ borderRight: "7px solid  #861f36" }}
                date={sub_heading}
                dateClassName="text-white"
                iconStyle={{ background: "#861f36", color: "#fff" }}
              >
                <h3 className="vertical-timeline-element-title">{heading}</h3>
                {_html(description)}
              </VerticalTimelineElement>
            </>
          })
        }
      </VerticalTimeline>
    </div>
  );
}

export default TimeLine;
