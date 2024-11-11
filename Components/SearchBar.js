import React from 'react';
import { XStack, Input } from 'tamagui';
import { Search, XCircle } from '@tamagui/lucide-icons';
import { colors, borderWidth } from '../styles/styles';

export function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <XStack  
      alignItems="center" 
      backgroundColor={colors.background.white} 
      borderRadius="$4" 
      paddingHorizontal="$2" 
      borderWidth={borderWidth.sm} 
      borderColor={colors.theme}
    >
      <Search size="$1" color={colors.icon.primary} />
      <Input 
        flex={1}
        size={"$3"}
        value={searchQuery}
        placeholder={"Search Notes"} 
        onChangeText={setSearchQuery}
        backgroundColor="transparent"
        borderWidth={borderWidth.null}
      />
      {searchQuery ? (
        <XCircle 
          color={colors.icon.secondary} 
          size={"$1"} 
          onPress={() => setSearchQuery('')}
        />
      ) : null}
    </XStack>
  );
}