import { Card } from "@/components/ui/card";

const JobsScreen = () => {
  return (
    <Card className="p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          En breve, podrás acceder a esta sección!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Mientras tanto, cebate unos mates 🧉
        </p>
      </div>
    </Card>
  );
};

export default JobsScreen;
