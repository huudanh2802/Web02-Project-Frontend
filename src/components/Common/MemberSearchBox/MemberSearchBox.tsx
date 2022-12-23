/* eslint-disable no-unused-vars */
import { Container, Row } from "react-bootstrap";
import Select from "react-select";
import MemberOptionDTO from "../../../dtos/MemberOptionDTO";

export interface MemberOption {
  value: MemberOptionDTO;
  label: string;
  disabled: boolean;
}
export default function MemberSearchBox({
  member,
  addMember
}: {
  member: MemberOption[];
  addMember: (event: any | undefined) => void;
}) {
  return (
    <Container>
      <Row>
        <Select
          styles={{
            control: (baseStyles) => ({
              ...baseStyles
            })
          }}
          value={null}
          options={member}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null
          }}
          noOptionsMessage={() => null}
          onChange={(option) => addMember(option)}
          isOptionDisabled={(option) => option!.disabled}
        />
      </Row>
    </Container>
  );
}
