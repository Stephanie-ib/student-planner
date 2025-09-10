import { colors } from "../constants";
import type { CategoryFormData } from "../types";

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (categoryData: CategoryFormData) => void;
  formData: CategoryFormData;
  onFormChange: (formData: CategoryFormData) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onFormChange
}) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 w-full max-w-md">
        <h2 className="text-white text-xl font-semibold mb-4">Add New Category</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
          </div>
          
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Color</label>
            <div className="grid grid-cols-4 gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => onFormChange({ ...formData, color })}
                  className={`w-10 h-10 rounded-lg ${color} ${
                    formData.color === color ? 'ring-2 ring-white' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Add Category
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm
