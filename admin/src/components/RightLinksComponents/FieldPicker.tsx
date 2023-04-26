import React, {useState} from 'react';
import {
  Box,
  Divider,
  Field,
  FieldLabel,
  Select,
  Option,
  Stack,
  Typography
} from '@strapi/design-system';
import {useCMEditViewDataManager} from '@strapi/helper-plugin';
import {useIntl} from 'react-intl';
import PluginId from "../../pluginId";

const FieldPicker = () => {
  const {modifiedData} = useCMEditViewDataManager();
  const {formatMessage} = useIntl();

  const [selectedField, setSelectedField] = useState('Content');

  // const [error, setError] = useState('');

  const [value, setValue] = useState();
  const [error, toggleError] = useState();
  const [disabled, toggleDisabled] = useState();

  const handleChange = (value: string) => {
    console.log('value', value);
  };

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
          <Box paddingTop={2} paddingBottom={6}>
            <Divider/>
          </Box>
          <Box paddingTop={1}>
            <Field>
              <Stack spacing={2}>
                <Select label="Content field"
                        placeholder="Pick content field"
                        hint="Choose from the available fields in this form"
                        onClear={() => {
                          // setSelectedField('');
                        }}
                        onChange={handleChange}
                        error={error}
                        value={selectedField}>
                  <Option value="Content">Content</Option>
                  <Option value="Other">Other field</Option>
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
