import React, {useEffect, useState} from 'react';
import {Button, Field, FieldError, FieldHint, FieldInput, FieldLabel, Stack} from '@strapi/design-system';
import {auth, useCMEditViewDataManager} from "@strapi/helper-plugin";
import {useIntl} from "react-intl";
import {Magic} from "@strapi/icons";

// @ts-ignore

interface InputProps {
  value: string;
  name: string;
  attribute: any;
  intlLabel: any;
  labelAction: string;
  required: boolean;
  description: any;
  error: string;
  onChange: Function;
}

const Input = ({
                 value,
                 name,
                 onChange,
                 error,
                 description,
                 required,
                 labelAction,
                 intlLabel,
                 attribute,
               }: InputProps) => {
  const {formatMessage} = useIntl();

  const {modifiedData} = useCMEditViewDataManager();

  const [metaDescription, setMetaDescription] = useState(value);

  const [isGenerating, setIsGenerating] = useState(false);

  const generateButtonText = isGenerating ? 'Generating...' : 'Generate';

  const contextFieldKey = attribute.options['context-selection-field-key'];

  useEffect(() => {
    console.log('Set warning if content is edited, so user can generate new metadescription', modifiedData);
  }, [modifiedData]);

  const handleChange = (value: string) => {
    setMetaDescription(value);

    onChange({target: {name, value: metaDescription, type: attribute.type}});
  };

  const handleGenerateClick = async () => {
    setIsGenerating(true);
    const response = await fetch(`/open-ai-seo-completion/generate-seo-information`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.getToken()}`
      },
      body: JSON.stringify({
        'content': modifiedData[contextFieldKey]
      })
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    const parsedResult = result.choices[0].text.replace(/(?:\r\n|\r|\n)/g, '');

    setMetaDescription(parsedResult);
    setIsGenerating(false);

    onChange({target: {name, value: parsedResult, type: attribute.type}});
  };

  return (
    <Field name={name} id={name} error={error} hint={description && formatMessage(description)}>
      <Stack spacing={2}>
        <FieldLabel action={labelAction}>{formatMessage(intlLabel)}</FieldLabel>

        <FieldInput
          id="meta-description-ai"
          value={metaDescription}
          minLength={50}
          maxLength={160}
          disabled={isGenerating}
          onChange={(e: any) => handleChange(e.target.value)}
        />
        <FieldHint/>
        <FieldError/>

        <Stack horizontal spacing={2}>
          <Button startIcon={<Magic/>} onClick={handleGenerateClick}>
            {generateButtonText}
          </Button>
        </Stack>

        <FieldHint/>
        <FieldError/>
      </Stack>
    </Field>
  );
}

export default Input;
