import { create } from "zustand";
import { AddressesData } from "../Data";

export type Address = (typeof AddressesData.addresses)[number];
export type AddressInput = Omit<Address, "id" | "isDefault">;

type AddressState = {
  addresses: Address[];
  addAddress: (address: AddressInput) => void;
  updateAddress: (id: number, address: AddressInput) => void;
  deleteAddress: (id: number) => void;
  setDefault: (id: number) => void;
};

export const useAddressStore = create<AddressState>((set) => ({
  addresses: AddressesData.addresses,
  addAddress: (address) =>
    set((state) => ({
      addresses: [
        ...state.addresses,
        {
          ...address,
          id: Date.now(),
          isDefault: state.addresses.length === 0,
        },
      ],
    })),
  updateAddress: (id, address) =>
    set((state) => ({
      addresses: state.addresses.map((item) =>
        item.id === id ? { ...item, ...address } : item,
      ),
    })),
  deleteAddress: (id) =>
    set((state) => {
      const remaining = state.addresses.filter((item) => item.id !== id);
      if (remaining.length > 0 && !remaining.some((item) => item.isDefault)) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }
      return { addresses: remaining };
    }),
  setDefault: (id) =>
    set((state) => ({
      addresses: state.addresses.map((item) => ({
        ...item,
        isDefault: item.id === id,
      })),
    })),
}));
