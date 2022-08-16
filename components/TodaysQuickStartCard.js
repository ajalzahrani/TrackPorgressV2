import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { LocationMarkerIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const TodaysQuickStartCard = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View className="bg-red-50 pt-3 pr-52 rounded-t-lg shadow">
        <View className="px-3 pb-4">
          <Text className=" pt-2">Sun 7 Aug</Text>
        </View>
      </View>
      <View className="bg-red-50 py-5 rounded-b-lg shadow">
        <Text className="text-center text-xl font-bold">Push up workout</Text>
      </View>
      <View>
        <TouchableOpacity
          className="mt-40 rounded-full p-5 bg-blue-50"
          onPress={() => {
            navigation.navigate("stat");
          }}
        >
          <Text className="text-center">Quick Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodaysQuickStartCard;
