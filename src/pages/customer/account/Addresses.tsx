import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SavedAddressCard from "../../../components/addresses/SavedAddressCard";
import AddressForm from "../../../components/addresses/AddressForm";
import { AddressesData } from "../../../Data";
import { useAddressStore } from "../../../store/addressStore";
import type { AddressInput } from "../../../store/addressStore";

const data = AddressesData;

export default function Addresses() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefault } =
    useAddressStore();
  const [editingId, setEditingId] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const editingAddress = addresses.find((address) => address.id === editingId);

  const startEditing = (id: number) => {
    setEditingId(id);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const removeAddress = (id: number) => {
    if (!window.confirm(data.deleteConfirm)) return;
    deleteAddress(id);
    if (editingId === id) setEditingId(null);
  };

  const saveAddress = (address: AddressInput) => {
    if (editingId !== null) {
      updateAddress(editingId, address);
      setEditingId(null);
    } else {
      addAddress(address);
    }
  };

  return (
    <div className="bg-background py-8">
      <div className="container flex max-w-5xl flex-col gap-6">
        <div>
          <Link
            to="/profile"
            className="mb-2 flex w-fit items-center gap-1 text-sm font-bold text-primary transition hover:text-primary-hover"
          >
            <ArrowRight size={16} />
            {data.backLabel}
          </Link>
          <h1 className="mb-1 text-3xl font-bold text-heading">
            {data.title} ({addresses.length} {data.countSuffix})
          </h1>
          <p className="text-muted">{data.description}</p>
        </div>

        {addresses.length === 0 ? (
          <p className="rounded-2xl bg-card py-12 text-center text-muted shadow-sm">
            {data.emptyMessage}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {addresses.map((address) => (
              <SavedAddressCard
                key={address.id}
                address={address}
                onEdit={() => startEditing(address.id)}
                onDelete={() => removeAddress(address.id)}
                onSetDefault={() => setDefault(address.id)}
              />
            ))}
          </div>
        )}

        <div ref={formRef}>
          <AddressForm
            key={editingId ?? "new"}
            initialValue={editingAddress}
            isEditing={editingId !== null}
            onSave={saveAddress}
            onCancel={() => setEditingId(null)}
          />
        </div>
      </div>
    </div>
  );
}
