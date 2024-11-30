import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import DynamicForm from "./components/DynamicForm";
import formConfig from "./utils/formConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: { refetchOnWindowFocus: false, retry: 1 },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full bg-white shadow-md p-6 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Dynamic Form</h2>
            <DynamicForm formConfig={formConfig} />
          </div>
        </div>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
