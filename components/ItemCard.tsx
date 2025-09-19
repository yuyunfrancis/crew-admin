import { FiEdit, FiTrash2 } from "react-icons/fi";
import Button from "./Button";

interface ItemCardProps {
  id: string;
  title: string;
  imageUrl?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ItemCard({
  id,
  title,
  imageUrl,
  onEdit,
  onDelete,
}: ItemCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 mb-2 truncate">{title}</h3>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<FiEdit />}
            className="flex-1 text-xs"
            onClick={() => onEdit?.(id)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={<FiTrash2 />}
            className="flex-1 text-xs"
            onClick={() => onDelete?.(id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
