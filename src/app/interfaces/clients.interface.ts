import ClientDevices from "./client-devices.interface";

export default interface Client{
  id?: string;
  name: string;
  phone: string;
  language: string;
  email: string;
  devices: ClientDevices[];
  createdAt: string;
}
