import { FaceIcon, ImageIcon, SunIcon } from "@radix-ui/react-icons";

function MyComponent() {
  return (
    <div>
      <FaceIcon />
      <SunIcon />
      <ImageIcon />
    </div>
  );
}

export default function App() {
  return (
    <div>
      <div className="text-purple-900 text-6xl">Hello world!</div>
      <MyComponent/>
    </div>
  );
}
