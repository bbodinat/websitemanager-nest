import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const PagesCreate = () => {
    const { formProps, saveButtonProps, query } = useForm();
       // Fetch sites for the Select dropdown
       const { selectProps } = useSelect({
        resource: "sites", // The resource to fetch (must match the API route)
        optionLabel: "name", // The property to use as the label
        optionValue: "id",   // The property to use as the value
    });
    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    name={"name"}
                    label="Page Name"
                    rules={[{ required: true, message: "Please enter the page name" }]}
                >
                    <Input placeholder="Enter page name" />
                </Form.Item>

                <Form.Item
                    name={["site", "id"]} // Ensure nested object structure for site ID
                    label="Site"
                    rules={[{ required: true, message: "Please select a site" }]}
                >
                    <Select {...selectProps} placeholder="Select a site" />
                </Form.Item>
            </Form>
        </Create>
    );
};
