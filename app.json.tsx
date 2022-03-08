import { ExpoConfig, ConfigContext } from '@expo/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email:string;
  photo?:string;
}

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'finaces',
  slug: "finaces",
  scheme: "finaces",
  version: "1.0.0",
  assetBundlePatterns: [
    "**/*"
  ]
})

function Json(){
  const [user, setUser] = useState<User>({}as User)
  
}