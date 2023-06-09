import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Box, Divider, Field, Option, Select, Stack, Typography} from '@strapi/design-system';
import {useCMEditViewDataManager} from '@strapi/helper-plugin';
import {useIntl} from 'react-intl';
import PluginId from "../../pluginId";
import {useLocalStorage} from "usehooks-ts";
import getTrad from "../../utils/getTrad";

const FieldPicker = () => {
  const {modifiedData, allLayoutData} = useCMEditViewDataManager();
  const {formatMessage} = useIntl();

  const storageKey = `selected-seo-ai-field-${allLayoutData.contentType.uid}`;
  const [selectedField, setSelectedField] = useLocalStorage<string | undefined>(storageKey, undefined);
  const [error, toggleError] = useState();

  const handleChange = (value: string) => {
    setSelectedField(value);
  };

  const richTextAttributes: any = Object.fromEntries(
    Object.entries(allLayoutData?.contentType?.attributes)
      .filter(([key, value]: any) => {
        return value['type'] === 'richtext';
      })
  );

  useLayoutEffect(() => {
    if (!selectedField && Object.keys(richTextAttributes)) {
      setSelectedField(Object.keys(richTextAttributes)[0]);
    }
  });

  if (modifiedData.hasOwnProperty('seo')) {
    return (
      <Box
        background="neutral0"
        borderColor="neutral150"
        hasRadius
        paddingBottom={4}
        paddingLeft={4}
        paddingRight={4}
        paddingTop={6}
        shadow="tableShadow"
      >
        <Box>
          <Typography variant="sigma" textColor="neutral600" id="seo">
            {formatMessage({
              id: PluginId,
              defaultMessage: 'Open AI SEO Completion'
            })}
          </Typography>
          <Box paddingTop={2} paddingBottom={4}>
            <Divider/>
          </Box>
          <Box>
            <Field>
              <Stack spacing={2}>
                <Typography variant="omega" textColor="neutral600">
                  {formatMessage({
                    id: getTrad('open-ai-seo-completion.field-picker.description'),
                    defaultMessage: 'Select the content field.',
                  })}
                </Typography>
                <Select placeholder={formatMessage({
                  id: getTrad('open-ai-seo-completion.field-picker.placeholder'),
                  defaultMessage: 'Select a field',
                })}
                        onClear={() => {
                          setSelectedField(undefined);
                        }}
                        onChange={handleChange}
                        error={error}
                        value={selectedField}>
                  {richTextAttributes && Object.keys(richTextAttributes).map((field: string) => {
                    return <Option value={field} key={field}>{field}</Option>
                  })}
                </Select>
              </Stack>
            </Field>
          </Box>
        </Box>
      </Box>
    );
  }
  return <></>;
};

export default FieldPicker;
