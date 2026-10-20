import { create } from "zustand";
import { CartData } from "../Data";

type OrderState = {
  quantities: Record<string, number>;
  notes: Record<string, string>;
  dayId: string;
  slotId: string;
  speedId: string;
  paymentId: string;
  setQuantity: (itemId: string, quantity: number) => void;
  setCart: (items: { id: string; quantity: number }[]) => void;
  setNote: (itemId: string, note: string) => void;
  setDay: (dayId: string) => void;
  setSlot: (slotId: string) => void;
  setSpeed: (speedId: string) => void;
  setPayment: (paymentId: string) => void;
};

const initialQuantities = Object.fromEntries(
  CartData.items.map((item) => [item.id, item.quantity]),
);

export const useOrderStore = create<OrderState>((set) => ({
  quantities: initialQuantities,
  notes: {},
  dayId: "25",
  slotId: "morning",
  speedId: "normal",
  paymentId: "cash",
  setQuantity: (itemId, quantity) =>
    set((state) => ({
      quantities: { ...state.quantities, [itemId]: Math.max(0, quantity) },
    })),
  setCart: (items) =>
    set({
      quantities: Object.fromEntries(
        CartData.items.map((item) => [
          item.id,
          items.find((cartItem) => cartItem.id === item.id)?.quantity ?? 0,
        ]),
      ),
    }),
  setNote: (itemId, note) =>
    set((state) => ({ notes: { ...state.notes, [itemId]: note } })),
  setDay: (dayId) => set({ dayId }),
  setSlot: (slotId) => set({ slotId }),
  setSpeed: (speedId) => set({ speedId }),
  setPayment: (paymentId) => set({ paymentId }),
}));

export function useCartItems() {
  const quantities = useOrderStore((state) => state.quantities);

  const items = CartData.items
    .map((item) => ({ ...item, quantity: quantities[item.id] ?? 0 }))
    .filter((item) => item.quantity > 0);

  const piecesCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return { items, piecesCount, subtotal };
}
