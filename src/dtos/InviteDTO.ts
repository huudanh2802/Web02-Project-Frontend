/* eslint-disable no-unused-vars */
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldValues
} from "react-hook-form";
import GroupInfoDTO from "./GroupInfoDTO";

export default interface InviteDTO {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: any) => void;
  groupMember: GroupInfoDTO;
}
